import PanelListItem from "./PanelListItem.jsx";
import PropTypes from "prop-types";

function PanelList(props) {
  const title = props.title;
  const nhansu = [
    {title: "Kế hoạch tuyển dụng", subtitle: "Quy trình lập kế hoạch tuyển dụng cho các phòng ban", url: null},
    {title: "Quy trình tuyển dụng", subtitle: "Quy trình tuyển dụng", url: null},
    {
      title: "Quy trình nhân viên mới",
      subtitle: "Quy trình yêu cầu cấp thiết bị, cấp email, tài khoản CRM cho nhân viên mới",
      url: null
    },
    {title: "Đánh giá thử việc", subtitle: "Quy trình đánh giá thử việc cho nhân viên thử việc", url: null},
    {title: "Xin nghỉ phép", subtitle: "Quy trình xin nghỉ phép của nhân viên", url: null},
    {title: "Yêu cầu làm thêm giờ", subtitle: "Quy trình làm thêm giờ của nhân viên", url: null}
  ];
  const hanhchinh = [
    {title: "Yêu cầu đặt phòng", subtitle: "Quy trình đặt phòng", url: "/room_booking"},
    {title: "Yêu cầu đặt xe", subtitle: "Quy trình đặt xe", url: "/car_booking"},
    {title: "Yêu cầu mua hàng", subtitle: "Quy trình yêu cầu mua hàng của nhân viên", url: "/buying_request"},
    {title: "Quy trình mua hàng", subtitle: "Quy trình mua hàng", url: null},
    {title: "Yêu cầu báo hỏng, bảo hành", subtitle: "Quy trình báo hỏng, bảo hành của nhân viên", url: null},
    {title: "Quy trình thanh lý tài sản", subtitle: "Quy trình thanh lý tài sản", url: null}
  ];
  const taichinh = [
    {title: "Lập kế hoạch ngân sách", subtitle: "Quy trình lập kế hoạch ngân sách của các phòng ban", url: null},
    {title: "Yêu cầu thanh toán", subtitle: "Quy trình yêu cầu thanh toán", url: null}
  ];
  let list = [];
  if (title === "Nhân sự") list = nhansu;
  else if (title === "Hành chính") list = hanhchinh;
  else if (title === "Tài chính kế toán") list = taichinh;

  const arr = [];
  for (let i = 0; i < list.length; i++) {
    arr.push(<PanelListItem key={i} number={i + 1} title={list[i].title} subtitle={list[i].subtitle}
                            url={list[i].url}/>);
  }
  return <>{arr}</>;
}

PanelList.propTypes = {
  title: PropTypes.string.isRequired
};

export default PanelList;