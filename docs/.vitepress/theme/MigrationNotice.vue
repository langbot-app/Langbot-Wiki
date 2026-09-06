<template>
  <aside class="migration-notice" aria-label="旧版文档迁移通知">
    <strong>LangBot v3 文档已停止维护</strong>
    <p>LangBot v3 及本文档早已停止维护，内容仅供历史参考，不适用于新版。建议使用新版 LangBot，并以新版文档为准。</p>
    <a href="https://langbot.app/docs/zh/insight/guide">前往新版文档 →</a>
  </aside>
</template>

<style scoped>
.migration-notice {
  margin: 0 0 24px;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-warning-2);
  border-radius: 8px;
  background: var(--vp-c-warning-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}
.migration-notice strong { display: block; font-size: 16px; }
.migration-notice p { margin: 6px 0; }
.migration-notice a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
