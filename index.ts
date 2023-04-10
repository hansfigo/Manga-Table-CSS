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

interface Students {
    "id": string,
    "name": string,
    "grade": number[]
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
    tableContainer!.innerHTML = await getDataApi("https://api.consumet.org/meta/anilist-manga/mahou%20shoujo%20madoka")

}())


const students : Students[] = [
    {
        name: "Madoka",
        id: "22.12.2201",
        grade: [90, 80, 80]
    }, {
        name: "Sayaka",
        id: "23.01.2302",
        grade: [85, 75, 90]
    },
    {
        name: "Homura",
        id: "24.02.2403",
        grade: [95, 85, 90]
    },
    {
        name: "Kyoko",
        id: "25.03.2504",
        grade: [80, 85, 95]
    },
    {
        name: "Mami",
        id: "26.04.2605",
        grade: [90, 95, 85]
    },
    {
        name: "Nagisa",
        id: "27.05.2706",
        grade: [85, 90, 80]
    }
]

function showStudentsInfo(data:Students[]) {

    let table: string = '<table>';
    table += '<tr><th>id</th><th>Name</th><th>Grade 1</th><th>Grade 2</th><th>Grade 3</th></tr>';

    data.map((e: Students) => {
        table += '<tr>'

        table += '<td>' + e.id + '</td>'

        table += '<td>' + e.name + '</td>'

        table += '<td>' + e.grade[0] + '</td>'
        table += '<td>' + e.grade[1] + '</td>'
        table += '<td>' + e.grade[2] + '</td>'

        table += '</tr>'
    })

    table += '</table>'

    return table
    
}

const tablePraktikum2 = document.getElementById('tablePraktikum2');
tablePraktikum2!.innerHTML = showStudentsInfo(students);
