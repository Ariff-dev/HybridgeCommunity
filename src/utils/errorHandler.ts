export interface ApiErrorType {
    success: false
    message: string
    errors?: Record<string, string[]>
    status?: number
}

export const handleApiError = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiErrorType

        // Handle validation errors
        if (apiError.errors) {
            const firstError = Object.values(apiError.errors)[0]
            return firstError ? firstError[0] : apiError.message
        }

        // Handle errors by status code
        if (apiError.status) {
            switch (apiError.status) {
                case 400:
                    return apiError.message || 'Datos inválidos. Por favor verifica tu información.'
                case 401:
                    return 'Credenciales incorrectas.'
                case 403:
                    return 'No tienes permisos para realizar esta acción.'
                case 404:
                    return 'Recurso no encontrado.'
                case 422:
                    return apiError.message || 'Error de validación.'
                case 500:
                    return 'Error del servidor. Intenta más tarde.'
                default:
                    return apiError.message || 'Ocurrió un error inesperado.'
            }
        }

        return apiError.message || 'Ocurrió un error inesperado.'
    }

    return 'Error de conexión. Verifica tu internet.'
}
