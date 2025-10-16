import { Request, Response } from 'express';
import { uploadToGCS } from '../../appServices/storage.service';
import providersService from '../services/providers.service';
import { User } from '../../user/type';

const uploadFile = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.params;
    const userId = (req.user as User).id;
    if (!userId || userId.trim() === '') {
      return res.status(400).json({ error: 'ID utilisateur manquant' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' });
    }

    const imageUrl = await uploadToGCS(req.file.buffer, req.file.originalname, req.file.mimetype);
    await providersService.updateProviderImage(userId, imageUrl);

    res.json({
      message: 'Image uploadée avec succès',
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errorMessage });
  }
};

export default uploadFile;
