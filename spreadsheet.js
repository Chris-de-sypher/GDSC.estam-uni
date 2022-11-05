/** @format */

const url =
  "https://docs.google.com/spreadsheets/d/1M5GUlCnqIHJvDxdniHuDH-qljyK_rlR8XffEc2VUkUU/gviz/tq?";

const f = document.querySelector(".output");
fetch(url)
  .then((res) => res.text())
  .then((data) => {
    // console.log(data)
    const rep = JSON.parse(data.substring(47).slice(0, -2));
    // console.log(rep)
    const row = document.createElement("tr");
    f.append(row);
    rep.table.cols.forEach((item) => {
      const cell = document.createElement("th");
      cell.textContent = item.label;
      row.append(cell);
      // console.log(item);
    });
    rep.table.rows.forEach((itemer) => {
      const container = document.createElement("tr");
      f.append(container);
      console.log(itemer);
      itemer.c.forEach((col) => {
        const col2 = document.createElement("td");
        container.append(col2);
        col2.textContent = col.v;
      });
    });
  });
