import {
  ClientNetworkEvents,
  ServerNetworkEvents,
} from 'ReplicatedStorage/shared/network'
import { ArcadeTableState } from 'ReplicatedStorage/shared/state/ArcadeTablesState'
import type {
  ArcadeControllerInterface,
  ArcadeTableMechanics,
} from 'ReplicatedStorage/shared/tables/mechanics'
import { BehaviorObject } from 'ReplicatedStorage/shared/utils/behavior'

export class FoosballMechanics implements ArcadeTableMechanics {
  puckNumber = 1

  onSetupTable(_arcadeTable: ArcadeTable, _state: ArcadeTableState) {}

  onCreateTablePart(
    _arcadeTable: ArcadeTable,
    state: ArcadeTableState,
    part: BasePart,
  ) {
    if (part.Parent?.Name === 'Box') {
      part.BrickColor = state.color
    }
  }

  onGameStart(
    _tableName: ArcadeTableName,
    _userId: number,
    _network: ServerNetworkEvents,
  ) {}

  onGameOver(_tableName: ArcadeTableName, _userId: number) {}

  onEvent(_arcadeTable: ArcadeTable, _eventName: string, _part?: BasePart) {}

  onScoreChanged(
    _tableName: ArcadeTableName,
    _arcadeTableState: ArcadeTableState,
  ) {}

  onClientInputBegan(
    _tableName: ArcadeTableName,
    _controllerState: ArcadeControllerInterface,
    _network: ClientNetworkEvents,
    _input: InputObject,
    _inputService?: UserInputService,
  ) {}

  onClientInputEnded(
    _tableName: ArcadeTableName,
    _controllerState: ArcadeControllerInterface,
    _network: ClientNetworkEvents,
    _input: InputObject,
    _inputService?: UserInputService,
  ) {}

  onClientNewPiece(
    _tableName: ArcadeTableName,
    _pieceType: string,
    _ballName: string,
  ) {}

  onNPCPlayingBehavior(
    _tableName: ArcadeTableName,
    _userId: number,
    _obj: BehaviorObject,
  ) {}
}
