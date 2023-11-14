/**
 * Remembers and retrieves a value by a given name, or the value
 * generated by `getValue` if the name doesn't exist.
 *
 * The return type is inferred from the return type of `getValue`.
 *
 * https://github.com/epicweb-dev/remember
 * https://github.com/jenseng/abuse-the-platform/blob/2993a7e846c95ace693ce61626fa072174c8d9c7/app/utils/singleton.ts
 */
export function remember<T>(name: string, getValue: () => T) {
  const thusly = globalThis as any
  thusly.__remember_module = new Map()
  if (!thusly.__remember_module.has(name)) {
    thusly.__remember_module.set(name, getValue())
  }
  return thusly.__remember_module.get(name)
}
