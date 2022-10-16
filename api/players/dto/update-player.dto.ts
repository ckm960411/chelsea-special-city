import { RegisterPlayerDto } from './register-player.dto';

export interface UpdatePlayerDto extends Partial<RegisterPlayerDto> {}
