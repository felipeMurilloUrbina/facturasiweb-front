export class ServicioDetalle {
  public Id= 0;
  public ServicioId= 0;
  public Codigo: string;
  public Descripcion: string;
  public Cantidad = 0;
  public Precio = 0;
  public Fecha= new Date();
  public get TotalNeto(): number {
    return this.Cantidad * this.Precio;
  }
}
