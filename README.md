# PickGood

Pickgood is a software interface connecting your shop's API (e.g., BillBee) with the warehouse workers, so that they know what products to pick and pack for an order.

## API

### Relational Model (RM) for (MySQL-)DB

- Station (_name_, description)
- Product (_productID_, in_stock, ordered, last_ordered, last_sold, last_stock_control, title, price, description, __CONFIGURABLE_FIELDS?__) // available = in_stock - ordered (as virtual column)
- Product_Images (_↑productID_, _img_url_)

- Invoice (_invoiceID_, status)
- Packing_Invoice (_↑invoiceID_, ↑current_station, packing_status)
- Station_Packed_Product (_↑invoiceID_, ↑station, _↑productID_, ↑userID)

  - // When a station packed their part of the invoice

- User (userID, firstname, lastname, ↑s_name)
