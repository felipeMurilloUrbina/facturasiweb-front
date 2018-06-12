import { ServicioDetalle } from './servicio-detalle.model';

export class Servicio {
  public Id = 0;
  public EquipoId = 0;
  public Mecanico: string;
  public EstaFacturado: boolean;
  public Observacion: string;
  public Detalles: ServicioDetalle[] = [];

  public get Subtotal(): number {
    return this.Detalles.length === 0  ? 0 : this.Detalles.map(c => c.TotalNeto).reduce((sum, current) => sum + current);
  }
  public get Iva(): number {
    return this.Detalles.length === 0  ? 0 : this.Subtotal * 0.16;
  }
  public get Total(): number {
    return this.Detalles.length === 0  ? 0 : this.Subtotal + this.Iva;
  }

}
