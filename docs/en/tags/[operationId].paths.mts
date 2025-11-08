import { usePaths } from 'vitepress-openapi'
import spec from '../../assets/service-api-openapi-en.json' with { type: 'json' }

export default {
    paths() {
        return usePaths({ spec })
            .getPathsByVerbs()
            .filter(item => item && item.operationId)
            .map(({ operationId, summary }) => {
                return {
                    params: {
                        operationId,
                        pageTitle: `${summary || operationId} - LangBot API`,
                    },
                }
            })
    },
}
