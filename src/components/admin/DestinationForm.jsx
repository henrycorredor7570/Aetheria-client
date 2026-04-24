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

    const handleChange = (e) => {
        const { name,value,files } = e.target;

        if(name === "image"){
            setForm({ ...form, image: files[0]});
        }else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
            <input name="name" placeholder="Nombre" onChange={handleChange} className="form-control mb-2" />
            <input name="country" placeholder="País" onChange={handleChange} className="form-control mb-2" />
            <input name="description" placeholder="Descripción" onChange={handleChange} className="form-control mb-2" />
            <input name="latitude" placeholder="Latitud" onChange={handleChange} className="form-control mb-2" />
            <input name="longitude" placeholder="Longitud" onChange={handleChange} className="form-control mb-2" />
            <input type="file" name="image" onChange={handleChange} className="form-control mb-2" />

            <button className="btn btn-primary">Crear</button>
        </form>
    );
};

export default DestinationForm;