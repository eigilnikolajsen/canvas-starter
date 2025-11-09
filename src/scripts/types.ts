// oxlint-disable typescript/no-explicit-any

/**
 * A general `Component` has no implicit `children` prop.  If desired, you can
 * specify one as in `Component<{name: String, children: React.ReactNode}>`.
 */
type Component<P extends Record<string, any> = object> = (
	props: P,
) => React.ReactNode;
/**
 * Extend props to forbid the `children` prop.
 * Use this to prevent accidentally passing `children` to components that
 * would silently throw them away.
 */
type VoidProps<P extends Record<string, any> = object> = P & {
	children?: never;
};
/**
 * `VoidComponent` forbids the `children` prop.
 * Use this to prevent accidentally passing `children` to components that
 * would silently throw them away.
 */
type VoidComponent<P extends Record<string, any> = object> = Component<
	VoidProps<P>
>;
/**
 * Extend props to allow an optional `children` prop with the usual
 * type in JSX, `React.ReactNode` (which allows elements, arrays, strings, etc.).
 * Use this for components that you want to accept children.
 */
type ParentProps<P extends Record<string, any> = object> = P & {
	children?: React.ReactNode;
};
/**
 * `ParentComponent` allows an optional `children` prop with the usual
 * type in JSX, `React.ReactNode` (which allows elements, arrays, strings, etc.).
 * Use this for components that you want to accept children.
 */
type ParentComponent<P extends Record<string, any> = object> = Component<
	ParentProps<P>
>;

export type { Component, ParentComponent, VoidComponent };
