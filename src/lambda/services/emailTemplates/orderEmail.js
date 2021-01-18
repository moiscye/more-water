module.exports = ({ order, user }) => {
  let table;
  order.products.map((item) => {
    table += `
            <tr>
          <td >
            <strong>Servicio: </strong>
            ${item.name}
          </td>
        </tr>
            `;
  });

  //   console.log(table);

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style >
    .py-4{
        padding: 1rem 0;
    }
    
  </style>
    
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <div>
    <table class="py-4">
        <thead>
        <tr>
            <th class="py-4">Detalles de tu pedido</th>
        </tr>
        </thead>
        <tbody> 
        ${table}(+)
        </tbody>
        </table>   
    </div>
  </body>
  </html>


  
    `;
};
