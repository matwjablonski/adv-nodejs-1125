export function Log() {
    return function (
        target: object, 
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        const timestamp = new Date().toISOString();

        descriptor.value = async function (...args: unknown[]) {
            console.log(`[${timestamp}] Calling ${propertyKey} with arguments:`, args);
            const result = await originalMethod.apply(this, args);
            console.log(`[${timestamp}] Result from ${propertyKey}:`, result);
            return result;
        };

        return descriptor;
    }
}
