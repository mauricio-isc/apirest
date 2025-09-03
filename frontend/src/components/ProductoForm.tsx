import React, { useState, useEffect} from "react";
import {Producto, ProductoFormData} from "../types/Producto";

interface ProductoFormProps{
    producto?: Producto | null;
    onSubmit: (data: ProductoFormData) => void;
    onCancel: () => void;
}

const ProductoForm: React.FC<ProductoFormProps> =({
    producto,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState<ProductoFormData>({
        nombre: '',
        precio: '',
        descripcion: '',
        stock: ''
    });

    useEffect(() =>{
        if(producto){
            setFormData({
                nombre: producto.nombre || '',
                precio: producto.precio.toString() || '',
                descripcion:producto.description || '',
                stock: producto.stock.toString() || ''
            });
        }
    }, [producto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        
    }
}