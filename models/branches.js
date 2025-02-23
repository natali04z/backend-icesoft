// sucursales.js

const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
@Column('sucursals')
class Sucursal {
    @PrimaryGeneratedColumn()
    idSucursal;

    // Ejemplo de otros campos que podrías agregar:
    @Column()
    nombre;

    @Column()
    direccion;

    @Column()
    telefono;
}

module.exports = Sucursal;