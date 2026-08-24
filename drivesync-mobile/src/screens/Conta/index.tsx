import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../../contexts/auth";
import { getUserData } from "../../services/user";  // Importe o serviço de consulta

import Button from "../../components/Button";
import Card from "../../components/Card";
import InfoRow from "../../components/InfoRow";
import SectionHeader from "../../components/SectionHeader";
import { Loading } from "../../components/Loading";
import theme from "../../theme";
import styles from './styles';

const MinhaConta: React.FC = () => {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      getUserData(user.email, 'seu_token_aqui')
        .then(data => {
          setUserData(data);
        })
        .catch(err => {
          console.error("Erro ao carregar dados do usuário", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  function handleSignOut() {
    signOut();
  }

  // Função para extrair as iniciais do nome
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part: string) => part.charAt(0).toUpperCase());
    return initials.join('');
  };

  if (loading) {
    return <Loading label="Carregando seus dados..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Exibe as iniciais do nome do usuário */}
      <View style={styles.profileInfo}>
        <View style={styles.circle}>
          {userData?.nome ? (
            <Text style={styles.initialsText}>{getInitials(userData.nome)}</Text>
          ) : (
            <Ionicons name="person" size={28} color={theme.COLORS.TEXT_INVERTED} />
          )}
        </View>

        {/* Nome e Cargo ao lado do círculo */}
        <View style={styles.userDetails}>
          <Text style={styles.userName} numberOfLines={2}>{userData?.nome || 'Usuário'}</Text>
          <Text style={styles.userPosition}>{userData?.cargo || '—'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Informações da conta" />

        <Card noPadding style={styles.infoCard}>
          <InfoRow label="E-mail" value={user?.email} last={!userData} />
          {userData ? <InfoRow label="Telefone" value={userData.telefone} last /> : null}
        </Card>
      </View>

      <View style={styles.footer}>
        <Button
          title="Desconectar"
          variant="destructive"
          icon="log-out-outline"
          onPress={handleSignOut}
        />
      </View>
    </ScrollView>
  );
};

export default MinhaConta;
