import React from 'react'

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */

class TimeTableCell extends React.Component {
    colors = [
        "#F44336", // RED
        "#E91E63", // PINK
        "#9C27B0", // PURPLE
        "#673AB7", // DEEPPURPLE
        "#3F51B5", // INDIGO
        "#2196F3", // BLUE
        "#03A9F4", // LIGHTBLUE
        "#00BCD4", // CYAN
        "#009688", // TEAL
        "#4CAF50", // GREEN
        "#8BC34A", // LIGHTGREEN
        "#CDDC39", // LIME
        "#FFEB3B", // YELLOW
        "#FFC107", // AMBER
        "#FF9800", // ORANGE
        "#FF5722", // DEEPORANGE
        "#795548", // BROWN
        "#9E9E9E", // GREY
        "#607D8B" // BLUEGREY
    ];

    constructor(props) {
        super(props);
    }

    render () {
        if(this.props.dataid == 0) {
            return (
                <td className="empty-slot">
                    <button className='cell-button'/>
                </td>
            )
        }
        else {
            return (
                <td bgcolor={this.colors[(this.props.dataid-1)*7%this.colors.length]} className="data">
                    <button className='cell-button'/>
                </td>
            )
        }
    }
}

export default TimeTableCell;