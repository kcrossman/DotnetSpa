import Vue from 'vue';
import Vuex from 'vuex';
import axios, { AxiosResponse } from 'axios';
import CustomerModel from '@/models/customer';
import OrderModel from '@/models/order';
import MergeCustomerModel from './models/merge-customer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customers: Array<CustomerModel>(),
    selectedCustomer: undefined,
    selectedCustomerOrders: Array<OrderModel>()
  },
  mutations: {
    selectCustomer(state: any, customer: CustomerModel): void {
      if (
        !state.selectedCustomer ||
        state.selectedCustomer.id !== customer.id
      ) {
        state.selectedCustomer = customer;
        state.selectedCustomerOrders = [];
      } else {
        state.selectedCustomer = undefined;
        state.selectedCustomerOrders = [];
      }
    },
    mergeCustomer(state: any, customer: CustomerModel): void {
      const existingCustomerIndex = state.customers.findIndex(
        (c: CustomerModel) => c.id === customer.id
      );
      if (existingCustomerIndex !== -1) {
        state.customers[existingCustomerIndex].firstName = customer.firstName;
        state.customers[existingCustomerIndex].lastName = customer.lastName;
      } else {
        state.customers.push(customer);
      }
      const customerId = customer.id;
      const mergeCustomer = <MergeCustomerModel>{
        firstName: customer.firstName,
        lastName: customer.lastName
      };
      axios
        .put(`http://localhost:5000/api/customer/${customerId}`, mergeCustomer)
        .catch(() => alert('Error saving changes to Customer.'));
    }
  },
  actions: {
    async refreshCustomers(): Promise<void> {
      const response: AxiosResponse = await axios.get(
        'http://localhost:5000/api/customers'
      );
      this.state.customers = response.data;
    },
    async refreshCustomerOrders(): Promise<void> {
      const customerId: number = this.state.selectedCustomer.id;
      const response: AxiosResponse = await axios.get(
        `http://localhost:5000/api/customer/${customerId}/orders`
      );
      this.state.selectedCustomerOrders = response.data;
    }
  }
});
