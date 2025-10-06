import { Alert, Image, ImageSourcePropType } from 'react-native'; 
import { getAuth } from 'firebase/auth';

import { CHAMPIONSHIP_DATA } from '@/data/championshipData';
import { NEWS_DATA } from '@/data/newsData';
import { storageService } from './storage/storageService';
import { newsService } from './news/newsService';
import { championshipService } from './championship/championshipService';
import { teamService } from './team/teamService';

export const seedChampionshipsToFirestore = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
        Alert.alert("ERRO", "Faça login como administrador antes de executar o seed.");
        return;
    }

    console.log("Iniciando semeadura de campeonatos com upload de imagens...");
    Alert.alert("Atenção", "Iniciando semeadura de campeonatos. Este processo pode demorar.");

    let successCount = 0;

    for (const championship of CHAMPIONSHIP_DATA) {
        try {
            const { image, tournamentWinner, matches, ...restData } = championship;

            const uploadImageIfExists = async (
                img: string | undefined | null,
                folder: string
            ): Promise<string | null> => {
                if (!img) return null;
                try {
                    const asset = Image.resolveAssetSource(img as ImageSourcePropType);
                    if (asset?.uri) {
                        return await storageService.uploadFileAndGetURL(asset.uri, folder);
                    } else {
                        console.warn(`Imagem inválida em ${folder}:`, img);
                        return null;
                    }
                } catch (err) {
                    console.error(`Erro ao subir imagem em ${folder}:`, err);
                    return null;
                }
            };

            const imageUrl = await uploadImageIfExists(image, "championship-covers");

            const matchesWithImages = matches
                ? await Promise.all(
                    matches.map(async (match) => {
                        const homeLogoUrl = await uploadImageIfExists(match?.home?.logo, "team-logos");
                        const awayLogoUrl = await uploadImageIfExists(match?.away?.logo, "team-logos");

                        const homeScorers = match?.home?.scorers &&
                            await Promise.all(
                                match?.home?.scorers?.map(async (player) => ({
                                    ...player,
                                    photo: await uploadImageIfExists(player.photo, "player-photos"),
                                }))
                            );
                        
                        const awayScorers = match?.away?.scorers &&
                            await Promise.all(
                                match?.away?.scorers?.map(async (player) => ({
                                    ...player,
                                    photo: await uploadImageIfExists(player.photo, "player-photos"),
                                }))
                            );

                        return {
                            ...match,
                            home: {
                                ...match.home,
                                logo: homeLogoUrl,
                                scorers: homeScorers,
                            },
                            away: {
                                ...match.away,
                                logo: awayLogoUrl,
                                scorers: awayScorers,
                            },
                        };
                    })
                )
                : [];

            let tournamentWinnerWithImage = null;
            if (tournamentWinner) {
                const winnerLogoUrl = await uploadImageIfExists(tournamentWinner.logo, "team-logos");
                tournamentWinnerWithImage = {
                    ...tournamentWinner,
                    logo: winnerLogoUrl,
                };
            }

            const dataToSave = {
                ...restData,
                image: imageUrl,
                matches: matchesWithImages,
                tournamentWinner: tournamentWinnerWithImage,
            };

            await championshipService.addChampionship(dataToSave);
            console.log(`✅ Campeonato "${championship.title}" adicionado com sucesso.`);
            successCount++;
        } catch (error) {
            console.error(`❌ Erro ao adicionar o campeonato "${championship.title}":`, error);
        }
    }

    console.log(`🏁 Semeadura concluída. ${successCount} campeonatos adicionados.`);
    Alert.alert("Sucesso", `✅ ${successCount} campeonatos semeados com sucesso!`);
};



export const seedNewsToFirestore = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
        Alert.alert("ERRO", "Faça login como administrador antes de executar o seed.");
        return;
    }

    console.log('Iniciando semeadura de notícias com upload de imagens...');
    Alert.alert("Atenção", "A iniciar a semeadura de notícias. Este processo pode demorar.");

    let successCount = 0;
    for (const newsItem of NEWS_DATA) {
        try {
            const { image, ...restData } = newsItem;
            let imageUrl: string | null = null;

            if (image) {
                const asset = Image.resolveAssetSource(image as ImageSourcePropType);
                if (asset?.uri) {
                    imageUrl = await storageService.uploadFileAndGetURL(asset.uri, 'news-covers');
                } else {
                    console.warn(`Imagem inválida para a notícia "${newsItem.title}":`, image);
                }
            }

            const dataToSave = {
                ...restData,
                image: imageUrl,
            };

            await newsService.addNews(dataToSave);
            console.log(`Notícia "${newsItem.title}" adicionada com sucesso.`);
            successCount++;
        } catch (error) {
            console.error(`Erro ao adicionar a notícia "${newsItem.title}":`, error);
        }
    }

    console.log(`Semeadura de notícias concluída. ${successCount} adicionadas.`);
    Alert.alert("Sucesso", `✅ ${successCount} notícias semeadas com sucesso!`);
};


export const seedTeamsToFirestore = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
        Alert.alert("ERRO", "Faça login como administrador antes de executar o seed.");
        return;
    }

    console.log('Iniciando semeadura de equipas com upload de imagens...');
    Alert.alert("Atenção", "A iniciar a semeadura de equipas. Este processo pode demorar.");

    const teamsMap = new Map<number, any>();

    CHAMPIONSHIP_DATA.forEach(championship => {
        championship.matches?.forEach(match => {
            [match.home, match.away].forEach(team => {
                if (team && !teamsMap.has(team.id)) {
                    teamsMap.set(team.id, {
                        id: team.id,
                        name: team.name,
                        logo: team.logo,
                        players: team.scorers?.map(p => ({ id: p.id, name: p.name, photo: p.photo })) || [],
                    });
                }
            });
        });
        if (championship.tournamentWinner && !teamsMap.has(championship.tournamentWinner.id)) {
            teamsMap.set(championship.tournamentWinner.id, championship.tournamentWinner);
        }
    });

    const uniqueTeams = Array.from(teamsMap.values());
    let successCount = 0;

    for (const team of uniqueTeams) {
        try {
            const { logo, players, ...restData } = team;

            const logoUrl = logo ? await storageService.uploadFileAndGetURL(Image.resolveAssetSource(logo as ImageSourcePropType).uri, 'team-logos') : null;

            const playersWithImages = players ? await Promise.all(
                players.map(async (player: any) => {
                    const photoUrl = player.photo ? await storageService.uploadFileAndGetURL(Image.resolveAssetSource(player.photo as ImageSourcePropType).uri, 'player-photos') : null;
                    return { ...player, photo: photoUrl };
                })
            ) : [];

            const dataToSave = {
                ...restData,
                logo: logoUrl,
                players: playersWithImages,
            };

            await teamService.addTeam(dataToSave);
            console.log(`✅ Equipa "${team.name}" adicionada com sucesso.`);
            successCount++;
        } catch (error) {
            console.error(`❌ Erro ao adicionar a equipa "${team.name}":`, error);
        }
    }

    console.log(`🏁 Semeadura de equipas concluída. ${successCount} adicionadas.`);
    Alert.alert("Sucesso", `✅ ${successCount} equipas semeadas com sucesso!`);
};