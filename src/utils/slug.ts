/**
 * Gera um slug a partir de um título
 * Converte para minúsculas, remove acentos e caracteres especiais,
 * substitui espaços por hífens
 */
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres Unicode (remove acentos)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais exceto letras, números, espaços e hífens
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-'); // Remove hífens duplicados
}

