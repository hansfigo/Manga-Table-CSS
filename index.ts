interface Anime {
    "currentPage": number
    "results": Array<Result>
}

interface Result {
    "id": string
    "title": { "romaji": string }
    "image": string
    "status": string
    "description": string
    "genres": Array<string>
}

const PriceList: Array<number> = [45_000, 55_000, 50_000]

async function getDataApi(url: string): Promise<string> {

    let table: string = '<table >';
    table += '<tr><th>Cover</th><th>Title</th><th>Status</th><th>Description</th><th>Genres</th></tr>';

    const data = await fetch(url).then((res) => res.json());

    data.results.map((e: Result) => {
        table += '<tr>'

        table += '<td>'
        table += '<img src = ' + e.image + ' />'
        table += '</td>'

        table += '<td class="book-title">' + e.title.romaji + '</td>'

        table += '<td>' + e.status + '</td>'

        e.description == null || e.description == " " ? table += '<td>' + "No desc" + '</td>' : table += '<td>' + e.description + '</td>'

        table += '<td>'
        e.genres.map((e) => {
            table += e + " "
        })
        table += '</td>'

        table += '</tr>'
    })

    table += '</table>'

    return table
}


(async function () {

    const tableContainer = document.getElementById('table-container');
    tableContainer!.innerHTML = await getDataApi("https://api.consumet.org/meta/anilist-manga/mahou%20shoujo")

}())
