import { memo } from "react"

/**
 * renders error message with the following proptypes
 *
 * @param {object} props
 * @param {boolean} props.message - error message to render
 * @returns
 */
const Error = ({ message }) => <p style={{ color: "red" }}>{message}</p>;

export default memo(Error);
