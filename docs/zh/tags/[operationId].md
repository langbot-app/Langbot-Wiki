---
aside: false
outline: [2, 3]
title: vitepress-openapi
---

<script setup lang="ts">
import { useData } from 'vitepress'

const { params } = useData()
</script>

<OAOperation :operationId="params.operationId" />
