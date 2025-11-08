import { usePaths } from 'vitepress-openapi'
import spec from '../../assets/service-api-openapi-zh.json' with { type: 'json' }

export default {
    paths() {
        return usePaths({ spec })
            .getTags()
            .map(({ name }) => {
                return {
                    params: {
                        tag: name,
                        pageTitle: `${name} - LangBot API`,
                    },
                }
            })
    },
}

