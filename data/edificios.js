const edificios = [
  {
    id: 1,
    nombre: "Docencia  5",
    pisos: 2,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStzzW-UgA49FcrKOkc0uj3ng72hUxiuT5gpg&s',
    espacios: [
      { 
        nombre: "Aula 1", 
        recursos: 10, 
        ultimaActualizacion: "2023-10-01", 
        imagen: "https://www.google.com/imgres?q=aulas&imgurl=https%3A%2F%2Fimg.freepik.com%2Fvector-premium%2Fdiseno-interiores-aulas-mobiliario-decoracion_1308-77146.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.es%2Fvector-premium%2Fdiseno-interiores-aulas-mobiliario-decoracion_20771716.htm&docid=A9Z_54w1H5LulM&tbnid=MQNrbDSgXnwxsM&vet=12ahUKEwiqh-2v8N2LAxViMNAFHWewEbsQM3oECH0QAA..i&w=626&h=418&hcb=2&ved=2ahUKEwiqh-2v8N2LAxViMNAFHWewEbsQM3oECH0QAA",
        inventarios: [
          { fecha: "2023-09-30", cantidad: 8, imagen: "https://example.com/inventario1.jpg" },
          { fecha: "2023-10-01", cantidad: 10, imagen: "https://example.com/inventario2.jpg" }
        ]
      },
      { 
        nombre: "Aula 2", 
        recursos: 15, 
        ultimaActualizacion: "2023-10-02",
        inventarios: [
          { fecha: "2023-09-29", cantidad: 14, imagen: "https://example.com/inventario3.jpg" }
        ]
      },
      { nombre: "Aula 3", recursos: 45, ultimaActualizacion: "2023-10-02" },
    ],
  },
  {
    id: 2,
    nombre: "Docencia 2",
    pisos: 2,
    espacios: [
      { nombre: "Aula 1", recursos: 8, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 12, ultimaActualizacion: "2023-10-03" },
    ],
  },
  {
    id: 3,
    nombre: "Docencia 3",
    pisos: 2,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCsuVxP0jm8IjGr-LqE1jX7Z-pUKrR91Z0jAgIvqihHIBPsQu_RXEEO4p2Gh3UMoZTsVI&usqp=CAU',
    espacios: [
      { nombre: "Aula 1", recursos: 5, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 7, ultimaActualizacion: "2023-10-04" },
    ],
  },
  {
    id: 4,
    nombre: "Docencia 4",
    pisos: 2,
    espacios: [
      { nombre: "Aula 1", recursos: 6, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 9, ultimaActualizacion: "2023-10-05" },
    ],
  },
  {
    id: 5,
    nombre: "CEDIM",
    pisos: 1,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCbmxhDR81ojqr_UvY9wvFDVJ7tiZc296iQ&s',
    espacios: [
      { nombre: "Aula 1", recursos: 20, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 25, ultimaActualizacion: "2023-10-06" },
    ],
  },
  {
    id: 6,
    nombre: "Docencia 6",
    pisos: 2,
    espacios: [
      { 
        nombre: "Aula 1", 
        recursos: 10, 
        ultimaActualizacion: "2023-10-01", 
        inventarios: [
          { 
            fecha: "2023-09-30", 
            cantidad: 8, 
            imagen: "https://example.com/inventario1.jpg",
            recursos: [
              { codigo: "M001", descripcion: "Mesa de estudio", marca: "IKEA", modelo: "ModA", nSerie: "12345" },
              { codigo: "S001", descripcion: "Silla ergonómica", marca: "IKEA", modelo: "ModB", nSerie: "54321" }
            ]
          },
          { 
            fecha: "2023-10-01", 
            cantidad: 10, 
            imagen: "https://example.com/inventario2.jpg",
            recursos: [
              { codigo: "TV001", descripcion: "Televisor LED", marca: "Samsung", modelo: "QLED", nSerie: "11111" }
            ]
          }
        ]
      },
      { 
        nombre: "Aula 2", 
        recursos: 15, 
        ultimaActualizacion: "2023-10-02",
        inventarios: [
          { 
            fecha: "2023-09-29", 
            cantidad: 14, 
            imagen: "https://example.com/inventario3.jpg",
            recursos: [
              { codigo: "C001", descripcion: "Cable HDMI", marca: "Belkin", modelo: "X100", nSerie: "22222" }
            ]
          }
        ]
      },
    ],
  },
  {
    id: 7,
    nombre: "Docencia 2",
    espacios: [
      { 
        nombre: "Aula 1", 
        recursos: 8, 
        ultimaActualizacion: "2023-10-01",
        inventarios: [
          { 
            fecha: "2023-09-28", 
            cantidad: 7, 
            imagen: "https://example.com/inventario4.jpg",
            recursos: [
              { codigo: "S002", descripcion: "Silla de conferencia", marca: "Herman Miller", modelo: "CM1", nSerie: "33333" }
            ]
          }
        ]
      },
      { 
        nombre: "Aula 2", 
        recursos: 12, 
        ultimaActualizacion: "2023-10-03",
        inventarios: [
          { 
            fecha: "2023-09-27", 
            cantidad: 12, 
            imagen: "https://example.com/inventario5.jpg",
            recursos: [
              { codigo: "M002", descripcion: "Mesa de reunión", marca: "IKEA", modelo: "ModC", nSerie: "44444" }
            ]
          }
        ]
      },
    ],
  },
  {
    id: 8,
    nombre: "Docencia 3",
    espacios: [
      { nombre: "Aula 1", recursos: 5, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 7, ultimaActualizacion: "2023-10-04" },
    ],
  },
  {
    id: 9,
    nombre: "Docencia 4",
    espacios: [
      { nombre: "Aula 1", recursos: 6, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 9, ultimaActualizacion: "2023-10-05" },
    ],
  },
  {
    id: 10,
    nombre: "CEDIM",
    espacios: [
      { nombre: "Aula 1", recursos: 20, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 25, ultimaActualizacion: "2023-10-06" },
    ],
  },
  {
    id: 11,
    nombre: "Docencia 1",
    espacios: [
      { 
        nombre: "Aula 1", 
        recursos: 10, 
        ultimaActualizacion: "2023-10-01", 
        inventarios: [
          { 
            fecha: "2023-09-30", 
            cantidad: 8, 
            imagen: "https://example.com/inventario1.jpg",
            recursos: [
              { codigo: "M001", descripcion: "Mesa de estudio", marca: "IKEA", modelo: "ModA", nSerie: "12345" },
              { codigo: "S001", descripcion: "Silla ergonómica", marca: "IKEA", modelo: "ModB", nSerie: "54321" }
            ]
          },
          { 
            fecha: "2023-10-01", 
            cantidad: 10, 
            imagen: "https://example.com/inventario2.jpg",
            recursos: [
              { codigo: "TV001", descripcion: "Televisor LED", marca: "Samsung", modelo: "QLED", nSerie: "11111" }
            ]
          }
        ]
      },
      { 
        nombre: "Aula 2", 
        recursos: 15, 
        ultimaActualizacion: "2023-10-02",
        inventarios: [
          { 
            fecha: "2023-09-29", 
            cantidad: 14, 
            imagen: "https://example.com/inventario3.jpg",
            recursos: [
              { codigo: "C001", descripcion: "Cable HDMI", marca: "Belkin", modelo: "X100", nSerie: "22222" }
            ]
          }
        ]
      },
    ],
  },
  {
    id: 12,
    nombre: "Docencia 2",
    espacios: [
      { 
        nombre: "Aula 1", 
        recursos: 8, 
        ultimaActualizacion: "2023-10-01",
        inventarios: [
          { 
            fecha: "2023-09-28", 
            cantidad: 7, 
            imagen: "https://example.com/inventario4.jpg",
            recursos: [
              { codigo: "S002", descripcion: "Silla de conferencia", marca: "Herman Miller", modelo: "CM1", nSerie: "33333" }
            ]
          }
        ]
      },
      { 
        nombre: "Aula 2", 
        recursos: 12, 
        ultimaActualizacion: "2023-10-03",
        inventarios: [
          { 
            fecha: "2023-09-27", 
            cantidad: 12, 
            imagen: "https://example.com/inventario5.jpg",
            recursos: [
              { codigo: "M002", descripcion: "Mesa de reunión", marca: "IKEA", modelo: "ModC", nSerie: "44444" }
            ]
          }
        ]
      },
    ],
  },
  {
    id: 13,
    nombre: "Docencia 3",
    espacios: [
      { nombre: "Aula 1", recursos: 5, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 7, ultimaActualizacion: "2023-10-04" },
    ],
  },
  {
    id: 14,
    nombre: "Docencia 4",
    espacios: [
      { nombre: "Aula 1", recursos: 6, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 9, ultimaActualizacion: "2023-10-05" },
    ],
  },
  {
    id: 15,
    nombre: "CEDIM",
    espacios: [
      { nombre: "Aula 1", recursos: 20, ultimaActualizacion: "2023-10-01" },
      { nombre: "Aula 2", recursos: 25, ultimaActualizacion: "2023-10-06" },
    ],
  },
];

export default edificios;
