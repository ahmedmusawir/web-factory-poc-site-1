import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals, ...nextTs,
  globalIgnores([".next/**", "next-env.d.ts", "playwright-report/**", "test-results/**", "QAM/evidence/qa-q2/20261028T081836Z/*.cjs"]),
]);
