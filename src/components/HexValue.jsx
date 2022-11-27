import {toast} from 'react-toastify';

export default ({children}) => {
    const copyHex = (e) => {
        toast("Copied address to clipboard", {type: "info"});
        navigator.clipboard.writeText(`0x${children.toString(16)}`);
        e.stopPropagation();
    }
    return <div className="hex-value" onClick={copyHex}>0x{children.toString(16)}</div>
}