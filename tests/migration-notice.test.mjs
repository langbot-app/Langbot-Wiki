import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('../', import.meta.url).pathname
function walk(dir, extension) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return []
    const path = join(dir, entry.name)
    return entry.isDirectory() ? walk(path, extension) : path.endsWith(extension) ? [path] : []
  })
}
const sources = walk(join(root, 'docs'), '.md')
const dist = join(root, 'docs/.vitepress/dist')
test('every source page renders one crawlable migration notice', () => {
  assert.ok(sources.length > 0)
  for (const source of sources) {
    const output = relative(join(root, 'docs'), source).replace(/\.md$/, '.html')
    const html = readFileSync(join(dist, output), 'utf8')
    assert.equal((html.match(/aria-label="旧版文档迁移通知"/g) || []).length, 1, output)
    assert.match(html, /LangBot v3 及本文档早已停止维护/, output)
    assert.match(html, /仅供历史参考，不适用于新版/, output)
    assert.match(html, /href="https:\/\/langbot.app\/docs\/zh\/insight\/guide"/, output)
    assert.match(html, /<meta name="description" content="[^\"]*v3[^\"]*停止维护/, output)
  }
  console.log(`Verified ${sources.length} source pages`)
})
