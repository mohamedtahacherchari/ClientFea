const OnSubmitAddClient = async (e) =>{
    //const Typeclient= Typeclient.current.value;
    const Refclient= RefclientRef.current.value;
    const Company = CompanyRef.current.value;
    const NumberSiret= NumberSiretRef.current.value;
    const VATnumber = VATnumberRef.current.value;
    const Title = TitleRef.current.value;
    const Firstname = FirstnameRef.current.value;
    const Surname = SurnameRef.current.value;
    const Email = EmailRef.current.value;
    const Phone = PhoneRef.current.value;
    const Portable = PortableRef.current.value;
    const Addrees= AddreesRef.current.value;
    const Codepostal = CodepostalRef.current.value;
    const City= CityRef.current.value;
    //const PaymentTerms = PaymentTermsRef.current.value;

var Status;
    if(clientType === 1)
        Status = "Client professionnel";
    if(clientType === 2)
        Status = "Client particulier";
  
var Status2;
 
if(condition === 10)
Status2 = "0 jours";
if(condition === 20)
Status2 = "7 jours";
if(condition === 30)
Status2 = "14 jours";
if(condition === 40)
Status2 = "30 jours";
if(condition === 50)
Status2 = "6O jours";
if(condition === 60)
Status2 = "90 jours";

    try {
        const res = await axios.post('/api/clientf/addclientf', {
           Typeclient: Status,
            Refclient: Refclient,
            Company : Company,
            NumberSiret :NumberSiret,
            VATnumber: VATnumber,
            Title : Title,
            Firstname: Firstname,
            Surname: Surname,
            Email : Email,
            Phone: Phone,
            Portable :Portable,
            Addrees  :Addrees ,
            Codepostal:Codepostal,
            City : City,
           PaymentTerms : Status2,

        },{
            headers: {Authorization: token}
        }) 
        toast.success('Client Ajouter avec succées' , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        console.log(res)
    } catch (err) {
        console.log(err)
        toast.error("Erreur", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

}