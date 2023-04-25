import { HttpHeaders } from "@angular/common/http";

export const AddTOkenToHeaderUtility = () =>{
    const token = localStorage.getItem('practical-SSDLC-token')
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return httpOptions
}