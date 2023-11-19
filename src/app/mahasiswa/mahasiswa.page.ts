import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {

  constructor() {

   }

  ngOnInit() {
    
    this.getMahasiswa();
    }
    getMahasiswa() {
    this._apiService.tampil('tampilMahasiswa.php').subscribe({
    next: (res: any) => {
    console.log('sukses', res);
    this.dataMahasiswa = res;
    },
    error: (err: any) => {
    console.log(err);
    },
    })
    }
    reset_model() {
      this.id = null;
      this.nama = '';
      this.jurusan = '';
      }
      open_modal_tambah(isOpen: boolean) {
      this.modal_tambah = isOpen;
      this.reset_model();
      this.modal_tambah = true;
      }
      cancel() {
      this.modal.dismiss();
      this.modal_tambah = false;
      this.reset_model();
      }
      //tambah
      tambahMahasiswa() {
        if (this.nama != '' && this.jurusan != '') {
        let data = {
        nama: this.nama,
        jurusan: this.jurusan,
        }
        this._apiService.tambah(data, '/tambahMahasiswa.php')
        .subscribe({
        next: (hasil: any) => {
        this.reset_model();
        console.log('berhasil tambah mahasiswa');
        this.getMahasiswa();
        this.modal_tambah = false;
        this.modal.dismiss();
        },
        error: (err: any) => {
        console.log('gagal tambah mahasiswa');
        }
        })
        } else {
        console.log('gagal tambah mahasiswa karena masih ada data yg kosong');
        }
        }
        //hapus
        hapusMahasiswa(id: any) {
          this._apiService.hapus(id,
          '/hapusMahasiswa.php?id=').subscribe({
          next: (res: any) => {
          console.log('sukses', res);
          this.getMahasiswa();
          console.log('berhasil hapus data');
          },
          error: (error: any) => {
          console.log('gagal');
          }
          })
          }
          ambilMahasiswa(id: any) {
            this._apiService.lihat(id,
            '/lihatMahasiswa.php?id=').subscribe({
            next: (hasil: any) => {
            console.log('sukses', hasil);
            let mahasiswa = hasil;
            this.id = mahasiswa.id;
            this.nama = mahasiswa.nama;
            this.jurusan = mahasiswa.jurusan;
            },
            error: (error: any) => {
            console.log('gagal ambil data');
            }
            })
            }
    
  }
  