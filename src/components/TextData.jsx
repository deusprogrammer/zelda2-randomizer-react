import React from 'react';
import HexValue from './HexValue';
import { toast } from 'react-toastify';

export default ({textData}) => {
    return (
        <table className="data-table striped">
            <thead>
                <tr>
                    <th>offset</th>
                    <th>size</th>
                    <th>text</th>
                </tr>
            </thead>
            <tbody>
                {textData.map(({text, size, offset}) => {
                    return (
                        <tr>
                            <td><HexValue>{offset}</HexValue></td>
                            <td>{size}</td>
                            <td style={{cursor: "pointer"}} onClick={() => {
                                toast("Copied text to clipboard", {type: "info"});
                                navigator.clipboard.writeText(text.replace(/\n/g, '\\n'));
                            }}>{text}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}