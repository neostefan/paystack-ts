/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  automock: false,
  setupFiles: ["./setupFile.ts"],
};
