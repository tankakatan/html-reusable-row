
const colors = [
    '#f00', '#f04', '#f08', '#f0c', '#f0f', '#c0f', '#80f', '#40f',
    '#00f', '#04f', '#08f', '#0cf', '#0ff', '#0fc', '#0f8', '#0f4',
    '#0f0', '#4f0', '#8f0', '#cf0', '#ff0', '#fc0', '#f80', '#f40',
]

document.addEventListener ('DOMContentLoaded', () => {

    const rowsPerScreen = 4
    const colsPerRow = 4
    const rowHeight = 100 / colsPerRow
    const totalRows = rowsPerScreen + 1
    const container = document.getElementById ('root')

    for (let i = 0; i < totalRows; i++) {

        const row = document.createElement ('div')

        row.index = i
        row.style.height = rowHeight + 'vh'
        row.style.transform = `translateY(${rowHeight * i}vh)`
        row.style.background = colors[i % colors.length]
        row.classList.add ('row')

        for (let j = 0; j < colsPerRow; j++) {
            const cell = document.createElement ('div')
            cell.classList.add ('cell')
            row.appendChild (cell)
        }

        container.appendChild (row)
    }

    let totalOffset = 0

    document.documentElement.addEventListener ('wheel', e => {

        e.preventDefault ()

        totalOffset += 100 * e.deltaY / window.innerHeight // vh

        for (let i = 0; i < totalRows; i++) {

            const row = container.childNodes[i]

            if (rowHeight * row.index - totalOffset < -rowHeight)
                row.index += totalRows

            if (rowHeight * row.index - totalOffset > rowHeight * (totalRows - 1))
                row.index -= totalRows

            const colorIndex = row.index % colors.length
            row.style.background = colors[colorIndex < 0 ? (colors.length + colorIndex) : colorIndex]
            row.style.transform = `translateY(${ rowHeight * row.index - totalOffset }vh)`
        }

    }, { passive: false })
})
