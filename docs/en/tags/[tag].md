---
aside: false
outline: false
title: vitepress-openapi
---

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { params } = useData()

const tag = params.value.tag
</script>

<OASpec :tags="[tag]" hide-info hide-servers hide-paths-summary />
