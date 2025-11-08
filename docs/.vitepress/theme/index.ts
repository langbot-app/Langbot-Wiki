// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'

import specZh from '../../assets/service-api-openapi-zh.json'
import specEn from '../../assets/service-api-openapi-en.json'

export default {
    extends: DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        // Determine which spec to use based on the current route
        const getSpec = () => {
            // Check if we're in the Chinese or English version
            if (typeof window !== 'undefined') {
                const path = window.location.pathname
                return path.startsWith('/zh') ? specZh : specEn
            }
            // Default to Chinese spec for SSR
            return specZh
        }

        const getLocale = () => {
            if (typeof window !== 'undefined') {
                const path = window.location.pathname
                return path.startsWith('/zh') ? 'zh' : 'en'
            }
            return 'zh'
        }

        // Register the openapi spec with custom configuration
        useOpenapi({
            spec: getSpec(),
            config: {
                // Allow users to customize the server URL in the playground
                server: {
                    allowCustomServer: true,
                },
                // Set locale based on current language
                i18n: {
                    locale: getLocale(),
                    fallbackLocale: 'en',
                },
            },
        })

        // Update spec when route changes
        if (router) {
            router.onAfterRouteChanged = (to) => {
                const newSpec = to.startsWith('/zh') ? specZh : specEn
                const newLocale = to.startsWith('/zh') ? 'zh' : 'en'

                useOpenapi({
                    spec: newSpec,
                    config: {
                        server: {
                            allowCustomServer: true,
                        },
                        i18n: {
                            locale: newLocale,
                            fallbackLocale: 'en',
                        },
                    },
                })
            }
        }

        // Then enhance the app with the theme
        theme.enhanceApp({ app, router, siteData })
    }
}