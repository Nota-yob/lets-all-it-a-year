export interface ResolvedStory {
    id: string;
    type: string;
    title: string;
    source: {
        id: string;
        name: string;
        theme: any;
    };
    data: any;
}


function resolveRefs(refs: Record<string, string | string[]>, metrics: any) {
    const resolved: Record<string, any> = {};

    for (const key in refs) {
        const metricRef = refs[key];

        if (Array.isArray(metricRef)) {
            // Multi-item case: array of metric IDs
            resolved[key] = metricRef
                .map(id => {
                    const metric = metrics[id];
                    if (!metric) throw new Error(`Missing metric: ${id}`);
                    return {
                        label: metric.label,
                        value: metric.value,
                        unit: metric.unit,
                        type: metric.type
                    };
                });
        } else {
            // Single-item case
            const metric = metrics[metricRef];
            if (!metric) {
                throw new Error(`Missing metric: ${metricRef}`);
            }
            resolved[key] = {
                label: metric.label,
                value: metric.value,
                unit: metric.unit,
                type: metric.type
            };
        }
    }

    return resolved;
}

export function resolveStory(ref: string, doc: any): ResolvedStory {
    const [sourceId, storyId] = ref.split('.');

    const source = doc.sources[sourceId];
    if (!source) {
        throw new Error(`Unknown source: ${sourceId}`);
    }

    const story = source.stories[storyId];
    if (!story) {
        throw new Error(`Unknown story: ${storyId} in ${sourceId}`);
    }

    let resolvedData = story.data;

    // Resolve metric reference if present
    if (story.data?.refs) {
        resolvedData = resolveRefs(story.data.refs, source.metrics);
    }

    return {
        id: `${sourceId}.${story.id}`,
        type: story.type,
        title: story.title,
        source: {
            id: sourceId,
            name: source.meta.name,
            theme: source.meta.theme
        },
        data: resolvedData
    };
}
