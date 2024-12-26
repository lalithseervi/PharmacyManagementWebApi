import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admin } from '../models/admin';
import { medicine } from '../models/medicine';
import { sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class CommonservicesService {

  private url : string = "https://localhost:44345/api/";

  constructor(private http : HttpClient) { }

  // Login API
  validateLogin(username: string, password : string)
  {
    const param = new HttpParams().set('username',username).set('password',password);
    return this.http.get(this.url + 'admins' + "/Verify", { params: param });
  }

  // Signup API
  PostSignup(record: admin): Observable<admin>
  {
    return this.http.post<admin>(this.url + 'admins', record);
  }

  //Medicine API
  PostMedicine(record: medicine): Observable<medicine>
  {
    return this.http.post<medicine>(this.url + 'medicines', record);
  }

  GetMedicine(): Observable<any>
    {
      return this.http.get(this.url + 'medicines');
    }

    // Update an existing medicine
    UpdateMedicine(id: number, record: any): Observable<any>
    {
      return this.http.put(this.url + 'medicines/' + id, record);
    }

    DeleteMedicine(id : number): Observable<any>
    {
      return this.http.delete(this.url + 'medicines/' + id);
    }

    
    
  


    //Sales API
    PostSale(record: sale): Observable<sale>
    {
      return this.http.post<sale>(this.url + 'sales', record);
    }

    GetSales(): Observable<any>
    {
      return this.http.get(this.url + 'sales');
    }



    // Supplier API
    PostSupplier(record: any): Observable<any>
    {
      return this.http.post(this.url + 'suppliers', record);
    }

    GetSupplier(): Observable<any>
    {
      return this.http.get(this.url + 'suppliers');
    }

    UpdateSupplier(id: number, record: any): Observable<any>
    {
      return this.http.put(this.url + 'suppliers/' + id, record);
    }

    DeleteSupplier(id: number): Observable<any>
    {
      return this.http.delete(this.url + 'suppliers/' + id);
    }
}
