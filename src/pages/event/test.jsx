import { format } from 'date-fns';

// ...

<Controller
  control={control}
  name="start"
  render={({ field }) => {
    // Convertir la valeur de field.value au format spécifié
    const formattedDate = format(new Date(field.value), 'EEE MMM dd yyyy HH:mm');
    console.log("Field value:", field.value);
    return (
      <DatePicker
        placeholderText="Sélectionner une date"
        onChange={(date) => field.onChange(date)}
        selected={formattedDate} // Utiliser la date formatée comme valeur sélectionnée
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy" // Conserver le format de date comme spécifié
        className="form-control"
        id="start"
        locale={fr} // Spécifiez la locale française ici
      />
    );
  }}
/>
