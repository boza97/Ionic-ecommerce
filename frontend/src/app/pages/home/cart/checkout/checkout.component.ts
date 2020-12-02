import { ModalController } from "@ionic/angular";
import { Component, OnInit, Input} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ShippingAddress } from "../../../../common/shippingAddress";
import { ShippingAddressService } from '../../../../services/shipping-address.service';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  @Input() total: string;
  @Input() selectedMode: "other" | "existing";

  constructor(
    private modalCtrl: ModalController,
    private shippingAddressService: ShippingAddressService) { }

  ngOnInit() {
    this.isLoading = true;
    if (this.selectedMode === "existing") {
      this.shippingAddressService.fetchShippingAddress().subscribe(info => {
        const shippingAddress = info;
        this.createForm(shippingAddress);
        this.isLoading = false;
      });
    } else {
      this.createForm();
      this.isLoading = false;
      console.log('RADIIII');
    }
  }

  onPlaceOrder() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      orderData: {
        contactName: this.form.get('contactName').value,
        city: this.form.get('city').value,
        cityCode: this.form.get('cityCode').value,
        address: this.form.get('address').value,
        phone: this.form.get('mobileNumber').value
      }
    }, 'confirm');
    this.form.reset();
  }

  createForm(shippingAddress?: ShippingAddress) {
    this.form = new FormGroup({
      city: new FormControl(!shippingAddress ? null : shippingAddress.city, {
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.pattern(/^[A-Za-z ]+$/)],
      }),
      cityCode: new FormControl(!shippingAddress ? null : shippingAddress.city_code, {
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]{4}$/),
        ],
      }),
      contactName: new FormControl(!shippingAddress ? null : shippingAddress.contact_name, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(/^[A-Za-z ]+$/)]
      }),
      address: new FormControl(!shippingAddress ? null : shippingAddress.address, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      mobileNumber: new FormControl(!shippingAddress ? null : shippingAddress.phone, {
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.pattern(/^06[0-9]\/[0-9]{6}[0-9]?$/),
        ],
      }),
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }
}
