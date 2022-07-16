const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const dataTiket = []
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(dataTiket);
});

app.post('/', (req, res) => {
    const data = req.body
    console.log(data);
    dataTiket.push({id: uuid(), ...data});
    res.send("Berhasil nge-post");
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const data = dataTiket.find(data => data.id == id)
    if (data) {
        dataTiket.splice(dataTiket.indexOf(data), 1);
    }

    console.log(dataTiket);

    res.send('Berhasil hapus data dengan id ${id}');
});

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nama, bioskop1, bioskop2, bioskop3 } = req.body;
    const data = dataTiket.find((data) => data.id == id);
    if (nama) data.nama = nama;
    if (bioskop1) data.bioskop1 = bioskop1;
    if (bioskop2) data.bioskop2 = bioskop2;
    if (bioskop3) data.bioskop3 = bioskop3;

    console.log('dataTiket', dataTiket);

    res.send('Berhasil Update data dengan id ${id}');
})

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});