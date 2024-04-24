export default async function createModelCarPostController(req, res) {

    try {
        // los datos del modelo de coche se envían en el cuerpo de la petición (req.body)
        const { name, image } = req.body;

        // Validación
        if ( !name ) {
            return res.status(400).send({ message: 'All fields are required.' });
        }
        const id = uuidv4();
        const data = { id, name, image };
        const savedBrand = await createBrand(data);
        res.status(201).send(savedBrand);
        
    } catch (error) {
        console.log("🚀 ~ createModelCarPostController ~ error:", error)
        res.status(500).send({ message: error.message });
    }
}