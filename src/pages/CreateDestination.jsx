import DestinationForm from "../components/admin/DestinationForm";
import { createDestination } from "../services/destinationService";

const CreateDestination = () => {
    const handleCreate = async (formData) => {
        try {
            const data = await createDestination(formData);
            console.log("Destino creado:", data);
            alert("Destino creado correctamente");
        }catch(error){
            console.error(error);
            alert("Error al crear el destino");
        }
    };

    return (
        <div>
            <DestinationForm onSubmit={handleCreate} />
        </div>
    );
};

export default CreateDestination;