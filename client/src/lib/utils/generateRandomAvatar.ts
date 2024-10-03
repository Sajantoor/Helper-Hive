import { toPng } from '@dicebear/converter';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import { uploadFile } from './uploadFiles';

async function generateRandomAvatar(seed: string) {
    const avatar = createAvatar(identicon, {
        seed: seed,
        backgroundType: ['gradientLinear'],
    });

    const png = toPng(avatar);
    return await png.toArrayBuffer();
}

export async function generateAndUploadRandomAvatar(seed: string) {
    const png = await generateRandomAvatar(seed);
    const file = new File([png], 'avatar.png', { type: 'image/png' });
    const url = await uploadFile(file);
    return url;
}
