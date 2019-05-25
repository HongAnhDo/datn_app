import MyUtil from "../../util/MyUtil";

const EmailTemplate = {
    getTemplate: (booking) => {
        var address = booking.cstm_deli_addr ? booking.cstm_deli_addr : "Nhận xe tại đại lý";
        var content = "";
        if (booking) {
            content =
                '<!DOCTYPE html>' +
                '<html>' +
                '' +
                '<head>' +
                '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
                '  <style>' +
                '.container {' +
                '   font-size: 16px;' +
                '   padding: 10px;' +
                '}' +
                '.table {' +
                '   width:100%;' +
                '   padding-left: 50px;' +
                '   text-align: left;' +
                '}' +
                '.table th {' +
                '   width: 25%; ' +
                '   ' +
                '}' +
                '.note {' +
                '   background: #e9e9e9;' +
                '   padding-left: 30px;' +
                '   padding-top: 5px;' +
                '   padding-bottom: 5px;' +
                '   margin-top: 10px;' +
                '}' +
                '@media screen and (max-width: 1000px) {' +
                '.container {' +
                '   font-size: 13px;' +
                '   padding: 0px;' +
                '}' +
                '.table {' +
                '   width:100%;' +
                '   padding-left: 0px;' +
                '}' +
                '.note {' +
                '   padding-left: 0px;' +
                '}' +
                '}' +
                '  </style>' +
                '</head>' +
                '' +
                '<body>' +
                '  <div class="container">' +
                '    <div style="height: 120px; padding-top: 30px;">' +
                '      <img style="height: 80px; display: block;margin-left: auto;margin-right: auto;width: auto;" src="https://chungxe.vn/assets/images/logo_cx.png"' +
                '        alt="logo" />' +
                '    </div>' +
                '    <hr style="border-style: solid; border-width: 0.5px;" />' +
                '    <div style="background: #e9e9e9;color: #333;padding-top: 5px;padding-bottom: 5px; box-sizing: border-box;">' +
                '      <div style="text-align: center;">' +
                '        <h3 style="color: blue;  text-transform: uppercase;"> THÔNG TIN ĐẶT XE</h3>' +
                '        <p> ' + MyUtil.getDateFormat(booking.book_crta) + ' </p>' +
                '        <p> <i style ="white-space: pre"> ' + ' (Yêu cầu đặt xe của bạn đã được hệ thống ghi nhận. \nChúng tôi sẽ liên lạc lại với bạn để thông báo tình trạng của xe ít nhất 6h trước thời điểm thuê xe.)' + '</i></p>' +
                '      </div>' +
                '      <div>' +
                '        <table class="table">' +
                '          <tr>' +
                '            <th><b> ' + 'Mã vé' + '</b></th>' +
                '            <td style="color: red; font-weight: 600">' + booking.book_code + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Khách hàng:' + '</b></th>' +
                '            <td>' + booking.cstm_name + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Số điện thoại:' + '</b></th>' +
                '            <td>' + booking.cstm_phon + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Email:' + '</b> </th>' +
                '            <td>' + booking.cstm_emai + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Địa chỉ nhận xe' + '</b></th>' +
                '            <td>' + address + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Ngày đặt:' + '</b></th>' +
                '            <td>' + MyUtil.getDatetimeFormat(booking.book_rent_date) + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Ngày trả:' + '</b></th>' +
                '            <td>' + MyUtil.getDatetimeFormat(booking.book_retun_date) + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Loại xe:' + '</b> </th>' +
                '            <td>' + booking.vhc_type_name + ' </td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Tên xe: ' + '</b></th>' +
                '            <td>' + booking.vhc_part_name + ' (hoặc tương đương)' + ' </td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Phương thức thanh toán' + '</b></th>' +
                '            <td> ' + booking.cstm_pay_meth.pay_meth_name + '</td>' +
                '          </tr>' +
                '          <tr>' +
                '            <th><b>' + 'Tổng giá' + '</b></th>' +
                '            <td>' + MyUtil.currencyFormat(booking.book_prie_tota) + ' VNĐ </td>' +
                '          </tr>' +
                '        </table>' +
                '      </div>' +
                '    </div>' +
                '    <div class="note">' +
                '      <p><i> <b>' + 'Lưu ý:' + ' </b></i></p>' +
                '      <ul>' +
                '        <li><i> ' + 'Miễn phí thay đổi thông tin chuyến đi' + ' </i> </li>' +
                '        <li><i> ' + 'Chungxe.vn cam kết chất lượng dịch vụ, chất lượng xe cho những chuyến đi đặt tại Chungxe.vn' + ' </i>' +
                '        </li>' +
                '      </ul>' +
                '    </div>' +
                '    <hr style="border-style: solid;border-width: 0.5px; " />' +
                '    <div style="background: #e9e9e9;padding-top: 5px;padding-bottom: 5px;">' +
                '      <table style="width:100%">' +
                '        <tr>' +
                '          <th><a href="https://chungxe.vn/support/car_rental/2"> ' + 'Câu hỏi thường gặp' + ' </a></th>' +
                '          <th><a href="https://chungxe.vn/policy/insurance"> ' + 'Chính sách bảo mật' + ' </a></th>' +
                '        </tr>' +
                '      </table>' +
                '    </div>' +
                '    <hr style="border-style: solid;border-width: 0.5px; " />' +
                '    <div style="background: #e9e9e9;padding-top: 5px;padding-bottom: 5px; text-align: center; font-size: 12px;">' +
                '      <p> © 2018 Chungxe.vn </p>' +
                '      <p> ' + 'Điện thoại: 1900 636585 – 090 450 9596' + '</p>' +
                '      <p>' + 'Email: contact@chungxe.vn' + ' </p>' +
                '      <p> ' + 'Tầng 5, 166 Phố Huế, Phường Ngô Thì Nhậm, Quận Hai Bà Trưng, Hà Nội.' + '</p>' +
                '    </div>' +
                '  </div>' +
                '</body>' +
                '' +
                '</html>';
        }
        return content
    }
}
export default EmailTemplate; 