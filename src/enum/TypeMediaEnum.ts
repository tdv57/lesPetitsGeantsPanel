export const TypeMediaEnumValue = {
    IMAGE: 'IMAGE',
    VIDEO: 'VIDEO'
} as const;

export type TypeMediaEnum = (typeof TypeMediaEnumValue)[keyof typeof TypeMediaEnumValue];