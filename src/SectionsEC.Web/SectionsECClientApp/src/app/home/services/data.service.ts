import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, share, throwError } from 'rxjs';
import { CalculationInput } from 'src/app/shared/models/calculation-input';
import { CalculationResult } from 'src/app/shared/models/calculation-result';
import { Material } from 'src/app/shared/models/materials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private readonly http: HttpClient) { }

  getMaterials(): Observable<Material>{
    return this.http.get<Material>(`${environment.api}/materials`).pipe(
      share()
    );
  }

  calculate(input: CalculationInput): Observable<CalculationResult>{
    return this.http.post<CalculationResult>(`${environment.api}/calculations`,input).pipe(
      share()
    );
  }

}


const mockedMaterials =
`
{"concrete":[{"grade":"C12/15","fck":12,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C16/20","fck":16,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C20/25","fck":20,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C25/30","fck":25,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C30/37","fck":30,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C35/45","fck":35,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C40/50","fck":40,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C45/55","fck":45,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C50/60","fck":50,"acc":1,"gammaC":1.5,"n":2,"ec2":0.002,"ecu2":0.0035,"fcd":0},{"grade":"C55/67","fck":55,"acc":1,"gammaC":1.5,"n":1.75,"ec2":0.0022,"ecu2":0.0031,"fcd":0},{"grade":"C60/75","fck":60,"acc":1,"gammaC":1.5,"n":1.6,"ec2":0.0023,"ecu2":0.0029,"fcd":0},{"grade":"C70/85","fck":70,"acc":1,"gammaC":1.5,"n":1.45,"ec2":0.0024,"ecu2":0.0027,"fcd":0},{"grade":"C80/95","fck":80,"acc":1,"gammaC":1.5,"n":1.4,"ec2":0.0025,"ecu2":0.0026,"fcd":0},{"grade":"C90/105","fck":90,"acc":1,"gammaC":1.5,"n":1.4,"ec2":0.0026,"ecu2":0.0026,"fcd":0}],"steel":[{"grade":"Class A","fyk":500,"gammaS":1.15,"k":1.05,"es":200000,"euk":0.025,"eudToEuk":0.9,"eud":0.015,"fyd":400},{"grade":"Class B","fyk":500,"gammaS":1.15,"k":1.08,"es":200000,"euk":0.05,"eudToEuk":0.9,"eud":0.04,"fyd":400},{"grade":"Class C","fyk":500,"gammaS":1.15,"k":1.15,"es":200000,"euk":0.075,"eudToEuk":0.9,"eud":0.04,"fyd":400}]}
`;
