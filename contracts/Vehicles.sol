    pragma solidity ^0.4.21;
    
    contract BotManagement{
            function addAccount(address) public returns(bool){}
            function checkAccount(address) public view returns(bool){}
    }
        
    contract Vehicles{
        
        //Khởi tạo address có quyền truy cập ban đầu.
        constructor(address _address) public{
              permissionList[_address].owner = _address;
              permissionList[_address].typePermis = 1;
        }
        
        //Liên kết với smart contract quản lý BOT
        int complete_setup = 0;
        BotManagement botMgmtContract;
        
       function setBotMgmt(address _address)  public {
            if ((checkPermission()==1) && (complete_setup==0)) {
                
                botMgmtContract = BotManagement(_address);
            }
        }
    
        //Các address có quyền truy cập tới smart contract này.
        struct Permission{
            address owner;
            int256 typePermis;
            //0. Bị thu hồi các quyền.
            //1. Cấp quyền cho các account khác và các quyền còn lại.
            //2. Chỉ có quyền đăng ký phương tiện, ko có quyền cấp quyền cho account khác.
        }
    
        //Danh sách các address có quyền truy cập
        mapping (address => Permission) permissionList;
       
       //Thông tin cá nhân của người đăng ký phương tiện giao thông
        struct Person {
            address owner;
            string dateRegis;
           
        }
        
        struct OwnerVehicle{
            string[] plate_id;
            uint256[] index;
        }
        
        mapping(address => OwnerVehicle)  ownerVehilces;
        
        function getOwnerVehicle(address _owner, uint256 index) public view returns(string, string, bool){
            string storage dateRegis = vehicles[ownerVehilces[_owner].plate_id[index]].persons[ownerVehilces[_owner].index[index]].dateRegis;
            if (getLastOwner(ownerVehilces[_owner].plate_id[index])!=_owner){
                return (ownerVehilces[_owner].plate_id[index], dateRegis, false);
            }
            else{
                 return (ownerVehilces[_owner].plate_id[index], dateRegis, true);
            }
        }
        
        function getOwnerVehicleLenght(address _owner) public constant returns(uint count) {
            return ownerVehilces[_owner].plate_id.length;
        }
    
        
        //Lưu thông tin phương tiện
        struct Vehicle{        
            string plate_id;
            mapping (uint256 => Person) persons;//Danh sách các chủ từng sở hữu phương tiện
            uint256 lenghtPerson;//Số lần xe đổi chủ
            string name;
            string typeOfVehicle;
            string color;
            string datePro;
            string charactic;
            string manufac;
            string serial;
            int status; //1. active, 0. deactive, -1. stolen.
        }
        
        //Danh sách các phương tiện
        mapping (string => Vehicle) vehicles;
        
        string[] public vehiclesList;
        
        //Kiểm tra trạng thái của phương tiện, đang hoạt động, ko hoạt động hay đã bị trộm
        function getStatus(string _plate_id) public view   returns(int){
            return (vehicles[_plate_id].status);
        }
        
       
        //Kiểm tra xem chủ nhân address có phải chủ phương tiện. Dùng để
        //kiểm tra khi có người yêu cầu thay đổi thông tin về phương tiện.
        function checkOwner(address _owner, string _plate_id) public view returns(bool){
             if (vehicles[_plate_id].persons[vehicles[_plate_id].lenghtPerson -1 ].owner != _owner){
                return (false);
            }
            else{
                return (true);
            }
        }
        
        //Kiểm tra xem address request lên smart contract có những quyền gì
        function checkPermission() public view returns(int256){
                return permissionList[msg.sender].typePermis;
        }
        
      
    
        //Thêm address có quyền truy cập smart contract
        function addPermission(address _address, int256 _type) public returns(bool){
        if (checkPermission() == 1) {
            permissionList[_address].owner = _address;
            permissionList[_address].typePermis = _type;
            
            return true;
        }
        return false;
           
        }
        
        //Đăng ký thêm phương tiện
        function addVehicle(address _owner, string _plate_id, string _name, string _type, string _color, string _datePro, string _dateRegis, string _charac, string _manufac, string _serial) public returns (bool){
            if (checkPermission()<1){
                return false;
            }
            else{
                
            if (!botMgmtContract.checkAccount(_owner)){
                botMgmtContract.addAccount(_owner);
            }
            
            Vehicle storage vehicle = vehicles[_plate_id];
            
            vehicle.lenghtPerson = 0;
     
            Person storage p = vehicle.persons[vehicle.lenghtPerson] ;
            p.owner = _owner;
            p.dateRegis= _dateRegis;
            
            vehicle.plate_id = _plate_id;
            vehicle.name = _name;
            vehicle.typeOfVehicle = _type;
            vehicle.color = _color;
            vehicle.datePro = _datePro;
            vehicle.charactic = _charac;
            vehicle.manufac = _manufac;
            vehicle.serial = _serial;
            vehicle.status = 1;
            ownerVehilces[_owner].plate_id.push(_plate_id) -1;
            ownerVehilces[_owner].index.push(vehicle.lenghtPerson) -1;
            vehicle.lenghtPerson++;
            vehiclesList.push(_plate_id) -1;
            return true;
        }
    }
    
        //Chuyển đổi chủ sở hữu phương tiện.
        function changeOwner(string _plate_id, address _owner, address _new_owner, string _dateRegis) public returns (bool){
           if (checkPermission()<1){
                return false;
            }
            
           if (!checkOwner(_owner, _plate_id)){
               return false;
           }
            else{
                  Person storage p = vehicles[_plate_id].persons[vehicles[_plate_id].lenghtPerson] ;
                  p.owner = _new_owner;
                  p.dateRegis = _dateRegis;
                  
                  ownerVehilces[_new_owner].plate_id.push(_plate_id) -1;
                  ownerVehilces[_new_owner].index.push(vehicles[_plate_id].lenghtPerson) -1;
                  
                  vehicles[_plate_id].lenghtPerson ++;
                  return true;
            }
        }
        
        //Thay đổi trạng thái của phương tiện
        function changeStatus(string _plate_id, address _owner, int _status) public returns(bool){
            if (checkPermission()<1){
                return false;
            }
            
            if (!checkOwner(_owner, _plate_id)){
                return false;
            }
            else{
                vehicles[_plate_id].status = _status;
                return (true);
            }
        }
    
        //Lấy số lượng chủ mà phương tiện đã qua tay
        function getOwnerLength(string _plate_id) public view returns(uint){
            return vehicles[_plate_id].lenghtPerson;
        }
    
         //Lấy thông tin người chủ cuối cùng của phương tiện
        function getLastOwner(string _plate_id) public view returns (address){
            return (vehicles[_plate_id].persons[vehicles[_plate_id].lenghtPerson-1].owner);
        }
    
        //Lấy thông tin về chủ phương tiện
        function getOwnerInfo(string _plate_id, uint256 index) public view returns (address, string){
            return (vehicles[_plate_id].persons[index].owner, vehicles[_plate_id].persons[index].dateRegis);
        }
       
        //Lấy thông tin về phương tiện - những thông tin cố định.
        function getFixedInfo(string _plate_id) view public returns (string, string, string, string, string) {
            return(vehicles[_plate_id].name, vehicles[_plate_id].typeOfVehicle, vehicles[_plate_id].datePro, vehicles[_plate_id].manufac, vehicles[_plate_id].serial);
        }
    
        //Lấy thông tin về phương tiện - những thông tin có thể bị thay đổi.
        function getDynamicInfo(string _plate_id) view public returns (address, string, string, string, int){
            address _owner = vehicles[_plate_id].persons[vehicles[_plate_id].lenghtPerson-1].owner;
            string storage _dateRegis = vehicles[_plate_id].persons[vehicles[_plate_id].lenghtPerson-1].dateRegis;
            return (_owner, _dateRegis , vehicles[_plate_id].color, vehicles[_plate_id].charactic, vehicles[_plate_id].status);
        }
    }
