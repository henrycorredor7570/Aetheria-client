import { useState } from "react";

const DestinationForm = ({onSubmit}) => {
    const [form, setForm ] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        country: "",
        image: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name,value,files } = e.target;

        if(name === "image"){
            setForm({ ...form, image: files[0]});
        }else {
            setForm({ ...form, [name]: value });
        }
    };

    // VALIDACIONES DEL FORMULARIO:
    const validate = () => {
        let newErrors = {};

        if(!form.name.trim()) newErrors.name = "El nombre es obligatorio";
        if(!form.description.trim()) newErrors.description = "La descripcion es obligatoria";
        if(!form.country.trim()) newErrors.country = "El país es obligatorio";

        const lat = parseFloat(form.latitude);
        const lng = parseFloat(form.longitude);

        if(isNaN(lat)){
            newErrors.latitude = "Latitud inválida";
        } else if (lat < -90 || lat > 90){
            newErrors.latitude = "Debe estar entre -90 y 90";
        }

        if(isNaN(lng)) {
            newErrors.longitude = "Longitud inválida";
        }else if (lng < -180 || lng > 180) {
            newErrors.longitude  ="debe estar entre -180 y 180";
        }

        //validacion de la imagen:
        if(form.image){
            const validTypes = ["image/jpeg", "image/png"];
            if (!validTypes.includes(form.image.type)){
                newErrors.image = "Solo formatos JPG o PNG";
            }
        }

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("country", form.country);
        formData.append("latitude", form.latitude);
        formData.append("longitude", form.longitude);
        formData.append("image", form.image);

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2>Crear Destino</h2>
            <input name="name" placeholder="Nombre" onChange={handleChange} className="form-control mb-1" />
            {errors.name && <small className="text-danger">{errors.name}</small>}
            <input name="country" placeholder="País" onChange={handleChange} className="form-control mb-1" />
            {errors.country && <small className="text-danger">{errors.country}</small>}
            <input name="description" placeholder="Descripción" onChange={handleChange} className="form-control mb-1" />
            {errors.description && <small className="text-danger">{errors.description}</small>}
            <input name="latitude" placeholder="Latitud" onChange={handleChange} className="form-control mb-1" />
            {errors.latitude && <small className="text-danger">{errors.latitude}</small>}
            <input name="longitude" placeholder="Longitud" onChange={handleChange} className="form-control mb-1" />
            {errors.longitude && <small className="text-danger">{errors.longitude}</small>}
            <input type="file" name="image" onChange={handleChange} className="form-control mb-1" />
            {errors.image && <small className="text-danger">{errors.image}</small>}

            <button className="btn btn-primary">Crear</button>
        </form>
    );
};

export default DestinationForm;